import "@src/styles/globals.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import type { AppProps } from "next/app";
import wrapper from "@src/store";
import { Provider } from "react-redux";
function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    );
}

export default App;
