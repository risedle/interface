import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class RisedleDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="dark font-inter h-full">
                <Head />
                <body className="bg-gray-light-1 dark:bg-gray-dark-1 h-full">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default RisedleDocument;
