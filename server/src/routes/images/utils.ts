import mime from "mime";

export function checkMimeType(mimetype: string) {
    const ext = mime.getExtension(mimetype);
    if (!ext) return false;
    return ["pdf"].includes(ext) || mimetype.startsWith("image/");
}
