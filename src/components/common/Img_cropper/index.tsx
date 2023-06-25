import {
    faArrowUpFromBracket,
    faImage,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import { PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
const MaxSize = 2 * 1024 * 1024;
function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
    return new Promise((resolve) => {
        canvas.toBlob(resolve);
    });
}
export async function imgPreview(
    image: HTMLImageElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0
) {
    const canvas = document.createElement("canvas");
    canvasPreview(image, canvas, crop, scale, rotate);
    const blob = await toBlob(canvas);

    if (!blob) throw new Error("Failed to create blob");

    return blob;
    // return URL.createObjectURL(blob);
}
export interface Props {
    aspect?: number;
    setValue: Dispatch<Blob>;
    exit: Function;
}

interface Crop {
    x: number;
    y: number;
    width: number;
    height: number;
}
function Container({
    children,
    exit,
}: {
    children: React.ReactNode;
    exit: Function;
}) {
    return (
        <div className="fixed w-full top-0 left-0 bg-neutral-100/80 z-50 h-full flex items-center justify-center">
            <div className="bg-neutral-100 w-[50rem] overflow-hidden items-stretch relative">
                {children}
                <div className="absolute right-0 top-0 p-4 z-50">
                    <button
                        type="button"
                        onClick={() => exit()}
                        aria-label="close"
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-3xl transition-all duration-300 text-neutral-70 hover:text-neutral-50"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default function ImageCropper({ exit, setValue, aspect = 1 }: Props) {
    const [crop, setCrop] = useState<Crop>({
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    });
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const [completeRotate, setCompleteRotate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState<string>();
    const [maxWidth, setWidth] = useState<number>();
    const [spos, setStartpos] = useState<{ x: number; y: number } | false>(
        false
    );
    const [error, setError] = useState<string | undefined>();
    const [sCrop, setStartCrop] = useState<Crop>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    function onImageLoad() {
        if (!imgRef.current || !maxWidth) return;
        const { width, height } = imgRef.current;
        const defaultWidth = Math.min(width, maxWidth);
        const defaultHeight = defaultWidth / aspect;
        setCrop({
            width: defaultWidth,
            height: defaultHeight,
            x: width / 2 - defaultWidth / 2,
            y: height / 2 - defaultHeight / 2,
        });
    }
    useEffect(() => {
        setImgSrc(undefined);
    }, [aspect]);
    function Move(ev: MouseEvent) {
        if (!imgRef.current || !spos) return;
        const { width, height } = imgRef.current.getBoundingClientRect();
        const x = Math.max(
            0,
            Math.min(width - sCrop.width, sCrop.x + (spos.x - ev.pageX))
        );
        const y = Math.max(
            0,
            Math.min(height - sCrop.height, sCrop.y + (spos.y - ev.pageY))
        );
        setCrop({
            ...crop,
            x,
            y,
        });
    }
    useEffect(() => {
        window.addEventListener("mouseup", () => {
            setStartpos(false);
        });
    }, []);
    useEffect(() => {
        window.addEventListener("mousemove", Move);
        return () => {
            window.removeEventListener("mousemove", Move);
        };
    }, [spos, scale]);
    const realRotate = completeRotate + rotate;

    async function onDownloadCropClick() {
        if (imgRef.current)
            setValue(
                await imgPreview(
                    imgRef.current,
                    {
                        unit: "px",
                        ...crop,
                    },
                    scale,
                    realRotate
                )
            );
    }
    function checkFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length != 1) return;
        const file = e.target.files[0];
        if (file.size > MaxSize)
            return setError("File size limit exceeded: 2MB maximum.");

        const reader = new FileReader();
        reader.addEventListener("load", () =>
            setImgSrc(reader.result?.toString() || "")
        );
        reader.readAsDataURL(file);
        setError(undefined);
    }
    if (!imgSrc)
        return (
            <Container exit={exit}>
                <div className="p-8 ">
                    <div className="relative border-[3px] border-dotted border-neutral-80 group  hover:border-neutral-70 cursor-pointer rounded-2xl">
                        <div className="flex items-center justify-center h-[40rem]">
                            <div className="max-w-[15rem] text-center">
                                <FontAwesomeIcon
                                    icon={faImage}
                                    className="text-neutral-30 block m-auto text-5xl"
                                />
                                <p className="text-neutral-60 group-hover:text-neutral-50 my-5">
                                    Drag &amp; drop or select a photo from your
                                    computer.
                                </p>
                                {error && (
                                    <p className="text-red-60 my-5">{error}</p>
                                )}

                                <button
                                    type="button"
                                    className="bg-blue-50 text-white py-2 px-3 text font-bold rounded"
                                >
                                    Choose File
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-neutral-80 w-[calc(100%-30px)] text-sm text-center h-10 bg-neutral-100">
                            Supported Formats JPEG & PNG
                        </div>
                        <input
                            type="file"
                            className="w-full h-full opacity-0 absolute top-0 cursor-pointer left-0 z-10"
                            onChange={checkFile}
                            accept="image/*"
                        />
                    </div>
                </div>
            </Container>
        );
    return (
        <Container exit={exit}>
            <div className="p-4">
                <div
                    className={classNames(
                        "bg-neutral-100/70 w-10/12 mx-auto z-10 flex-1 overflow-hidden relative",
                        "before:content-[''] before:w-full before:h-full before:absolute before:bg-neutral-100/80"
                    )}
                >
                    <div className="w-[20rem] flex items-center justify-center mx-auto h-[25rem] relative">
                        <div className="w-fit relative">
                            <div
                                ref={(cur) => {
                                    if (cur) setWidth(cur.offsetWidth);
                                }}
                                onMouseDown={(ev) => {
                                    setStartpos({
                                        x: ev.pageX,
                                        y: ev.pageY,
                                    });

                                    setStartCrop({ ...crop });
                                }}
                                onMouseUp={() => {
                                    setStartpos(false);
                                }}
                                className="overflow-hidden w-[15rem] relative"
                                style={{
                                    aspectRatio: aspect,
                                    MozWindowDragging: "no-drag",
                                }}
                            >
                                <div
                                    style={{
                                        transform: `scale(${scale}) rotate(${realRotate}deg)`,
                                        top: `-${crop.y}px`,
                                        left: `-${crop.x}px`,
                                        width: imgRef.current?.width,
                                        height: imgRef.current?.height,
                                    }}
                                    ref={(e) => {
                                        if (e)
                                            e.style.backgroundImage = `url(${imgSrc})`;
                                    }}
                                    className="absolute max-w-[15rem] bg-contain origin-top-left"
                                ></div>
                            </div>
                            <div
                                className={classNames(
                                    "absolute w-fit top-0 left-0",
                                    "before:content-[''] before:w-full before:h-full before:absolute before:bg-neutral-100/80"
                                )}
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    style={{
                                        transform: `scale(${scale}) rotate(${realRotate}deg)`,
                                        top: `-${crop.y}px`,
                                        left: `-${crop.x}px`,
                                    }}
                                    className="absolute max-w-[15rem] -z-10 origin-top-left"
                                    onLoad={onImageLoad}
                                />
                            </div>
                        </div>

                        <div className="absolute z-10 text-neutral-70 -right-20 top-1/2 -translate-y-1/2 text-center">
                            <div>Zoom</div>
                            <div>x3</div>
                            <div className="h-44 relative">
                                <input
                                    className={classNames(
                                        "block appearance-none w-40 bg-[transparent] outline-none origin-center -translate-y-1/2 -translate-x-1/2 -rotate-90 absolute left-1/2 top-1/2",
                                        "after:content-[''] after:absolute after:w-full after:h-0 after:-translate-y-1/2 after:top-1/2  after:border-t-[2px] after:border-dotted after:border-neutral-70 after:-z-10",
                                        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4  [&::-webkit-slider-thumb]:rounded-[50%] [&::-webkit-slider-thumb]:bg-blue-60 [&::-webkit-slider-thumb]:z-10"
                                    )}
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.1"
                                    onChange={(e) => {
                                        if (!imgRef.current) return;
                                        const { width, height } =
                                            imgRef.current.getBoundingClientRect();
                                        const x = Math.max(
                                            0,
                                            Math.min(
                                                width - sCrop.width,
                                                crop.x
                                            )
                                        );
                                        const y = Math.max(
                                            0,
                                            Math.min(
                                                height - sCrop.height,
                                                crop.y
                                            )
                                        );
                                        setCrop({ ...crop, x, y });
                                        setScale(+e.currentTarget.value);
                                    }}
                                    defaultValue={0}
                                />
                            </div>
                            <div>x1</div>
                        </div>
                    </div>
                </div>
                {error && (
                    <p className="text-red-60 my-5 text-center text-lg w-11/12 mx-auto">
                        {error}
                    </p>
                )}

                {/* <div className="flex justify-between items-center px-10 text-neutral-50 mt-5">
                    <button
                        type="button"
                        className="text-center"
                        onClick={() => {
                            setCompleteRotate((completeRotate - 90) % 360);
                        }}
                    >
                        <span className="block">-90°</span>
                        <FontAwesomeIcon
                            icon={faArrowRotateLeft}
                            className="text-2xl py-1"
                        />
                    </button>
                    <div className="relative text-center pt-1 z-10">
                        <div>
                            {rotate > 0 && "+"}
                            {rotate}°
                        </div>
                        <input
                            className={classNames(
                                "appearance-none mt-4 w-[15rem] bg-[transparent] outline-none relative",
                                "after:content-[''] after:absolute after:w-full after:h-0 after:-translate-y-1/2 after:top-1/2  after:border-t-[5px] after:border-dotted after:border-neutral-70 after:-z-10",
                                "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4  [&::-webkit-slider-thumb]:rounded-[50%] [&::-webkit-slider-thumb]:bg-blue-60"
                            )}
                            type="range"
                            min="-45"
                            max="45"
                            step="5"
                            defaultValue={0}
                            onChange={(e) => {
                                setRotate(+e.currentTarget.value);
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        className="text-center"
                        onClick={() => {
                            setCompleteRotate((completeRotate + 90) % 360);
                        }}
                    >
                        <span className="block">+90°</span>
                        <FontAwesomeIcon
                            icon={faArrowRotateRight}
                            className="text-2xl py-1"
                        />
                    </button>
                </div> */}
            </div>
            <div className="border-t flex justify-between items-center border-solid border-neutral-40/20 py-5 px-5 ">
                <label
                    htmlFor={"image-uploader"}
                    className="text-neutral-60 cursor-pointer hover:text-neutral-30 transition-all duration-400 text-xl"
                >
                    <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                    />
                    <span className="px-3 font-semibold">Upload New</span>
                </label>
                <input
                    type="file"
                    className="hidden"
                    id="image-uploader"
                    onChange={checkFile}
                    accept="image/*"
                />
                <button
                    onClick={() => {
                        setLoading(true);
                        onDownloadCropClick().then(() => {
                            setLoading(false);
                        });
                    }}
                    disabled={loading}
                    type="button"
                    className="bg-blue-50 hover:bg-blue-60 transition-all duration-400 text-white  py-2 px-3 font-bold rounded"
                >
                    Save Changes
                </button>
            </div>
        </Container>
    );
}
