import React, { useEffect } from "react";
import style from "./rating.module.css";
const RatingInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
    return (
        <div className={style.rating}>
            <label>
                <input
                    {...props}
                    type="radio"
                    value={1}
                    ref={ref}
                />
                <span className={style.icon}>★</span>
            </label>
            <label>
                <input
                    {...props}
                    type="radio"
                    value={2}
                    ref={ref}
                />
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
            </label>
            <label>
                <input
                    {...props}
                    type="radio"
                    value={3}
                    ref={ref}
                />
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
            </label>
            <label>
                <input
                    {...props}
                    type="radio"
                    value={4}
                    ref={ref}
                />
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
            </label>
            <label>
                <input
                    {...props}
                    type="radio"
                    value={5}
                    ref={ref}
                />
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
                <span className={style.icon}>★</span>
            </label>
        </div>
    );
});
export default RatingInput;
