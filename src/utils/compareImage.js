const BlinkDiff = require('blink-diff');

export default function compareImage(baselineImage, latestImage, diffImage) {
    return new Promise(function (resolve, reject) {
        const diff = new BlinkDiff({
            imageAPath: baselineImage,
            imageBPath: latestImage,

            thresholdType: BlinkDiff.THRESHOLD_PERCENT,
            threshold: 0.001, // 1% threshold

            imageOutputPath: diffImage,
            verbose: true
        });

        diff.run((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}