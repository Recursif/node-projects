
const _ = require('highland')

const fs = require('fs')
const csv = require('csv-parser')
const elasticsearch = require('elasticsearch')

const start = async () => {
    const client = new elasticsearch.Client({
        host: 'localhost:9200',
        // log: 'trace',
    })

    await client.ping({requestTimeout: 30000})
    console.log('pinged server')

    try {
        await client.indices.create({index: 'osm'})
        console.log('created index')
    } catch (err) {
        if (err.status === 400) {
            console.log('index already exists')
        } else {
            throw err
        }
    }

    // process file 
    let currentIndex = 0

    const stream = _(
        fs.createReadStream('./planet-latest-100k_geonames.tsv').pipe(
            csv({
                separator: '\t',
            })
        )
    )
    .map(data => ({
        ...data,
        alternative_names: data.alternative_names.split(','),
        lon_num: parseFloat(data.lon),
        lat_num: parseFloat(data.lat),
        place_rank_num: parseInt(data.place_rank, 10),
        importance_num: parseFloat(data.importance),
    }))
    .map(data => [
        {
            index: {_index: 'osm', _type: 'place', _id: data.osm_id},
        },
        data,
    ])
    .batch(100) // 100 batch to not overload the sgdb
    .each(async entries => {
        // pause the stream
        stream.pause()
        // reduce entries to an array
        const body = entries.reduce((acc, val) => acc.concat(val), [])
        // put the body in the sgdb
        await client.bulk({body})
        currentIndex += 100
        console.log('done with', currentIndex)
        stream.resume()
    })
    .on('end', () => {
        console.log('done')
        process.exit()
    })
}

start()

