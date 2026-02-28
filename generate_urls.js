const fs = require('fs');

async function search(query) {
    const r = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=30`);
    const d = await r.json();
    const valid = d.results.filter(x => x.urls.raw.includes('images.unsplash.com'));
    if (valid.length === 0) return null;
    const rawUrl = valid[0].urls.raw;
    return rawUrl.split('?')[0] + '?q=80&w=4000&auto=format&fit=crop';
}

async function run() {
    const models = [
        'white porsche 911 carrera',
        'white porsche 911 carrera s',
        'white porsche 911 turbo',
        'white porsche 911 gt3 rs',
        'white porsche taycan',
        'white porsche panamera'
    ];

    const results = {};
    for (const m of models) {
        console.log(`Searching for: ${m}`);
        results[m] = await search(m);
    }
    fs.writeFileSync('unsplash_urls.json', JSON.stringify(results, null, 2));
    console.log('Done.');
}
run();
