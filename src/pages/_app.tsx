import "@src/styles/globals.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-phone-number-input/style.css";
config.autoAddCss = false;
import type { AppProps } from "next/app";
import wrapper from "@src/store";
import { Provider } from "react-redux";
import LoadingState from "@src/components/loading";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <LoadingState />
                <Component {...props.pageProps} />
            </LocalizationProvider>
        </Provider>
    );
}

export default App;
