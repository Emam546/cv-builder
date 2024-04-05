import fs from "fs/promises";
export function exist(path: string) {
    return new Promise<boolean>((res) => {
        fs.access(path)
            .then(() => {
                res(true);
            })
            .catch(() => {
                res(false);
            });
    });
}
