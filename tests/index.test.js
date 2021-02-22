import test from 'tape';

test('test using promises', async (t) => {
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(42)
        }, 500);
    });
    t.ok(result);
});
