import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import "github-markdown-css/github-markdown-light.css"
import Button from "/components/Button.tsx";

export default function Index() {

    const [url, setUrl] = useState<String>("");
    const [token, setToken] = useState<String>("");
    const [mdData, setMdData] = useState<String>("");

    const submit = async () => {
        let urlList = url.split("/")
        if (urlList.length >= 2) {
            let lastTwo = urlList.slice(-2);
            const formatData = lastTwo[0] + "/" + lastTwo[1]
            console.log(formatData)
            setMdData("")
            const response = await fetch(`/api/_getRepoWatcher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: formatData, token
                })
            });
            const data = await response.json();
            setMdData(data);
        } else {
            alert("you input url have some error! Please check~")
        }
    }

    const downloadCsv = async () => {
        const rows = mdData.split('\n');
        let csv = []
        rows.forEach(row => {
            let cols = row.trim().split('|');
            cols = cols.slice(1, cols.length - 1);
            if (cols && cols.length === 6) {
                csv.push(`${cols[0].trim()},${cols[1].trim()},${cols[2].trim()},${cols[3].trim()},${cols[4].trim()},${cols[5].trim()}`);
            }
        })

        const blob = new Blob([csv.join('\n')], {type: 'text/csv;charset=utf-8;'});
        const csvURL = URL.createObjectURL(blob);
        const tempLink = document.createElement('a');

        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'data.csv');
        tempLink.click();
    }

    return (
        <div>
            <div id="header" className="sticky bg-white top-0 flex justify-between items-center pt-4 px-7">
                <img className="h-14" src="/logo-with-text.png"/>
                <div className="flex">
                    <a href="https://twitter.com/flows_network">
                        <img alt="twitter" className="w-12 mr-6" src="/twitter.png"/>
                    </a>
                    <a href="https://discord.gg/TrPfq677au">
                        <img alt="discord" className="w-12 mr-6" src="/discord.png"/>
                    </a>
                </div>
            </div>
            <div id="body" className="flex justify-center items-center flex-col mx-4 mb-4">
                <div className="font-bold mt-20">Get the data of your GitHub repo star, fork, and watch.</div>
                <input onChange={(e) => {
                    setUrl(e.target.value)
                }} className="rounded border border-black py-4 px-6 mt-11 w-3/4" placeholder="Enter org/repo"/>
                <input onChange={(e) => {
                    setToken(e.target.value)
                }} className="rounded border border-black py-4 px-6 mt-6 w-3/4" placeholder="Enter GitHub token"/>
                <a target="_blank"
                   href="https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                   className="text-sm mt-2 w-3/4 text-start hover:underline hover:pointer">How to get the github
                    token?</a>
                <div className="mt-6">
                    <Button className="h-12 px-10" disabled={!url || !token} type="primary" text="Submit"
                            onClick={submit}/>
                </div>
                <div className="mt-16 mb-10">Powered by <a className="text-main" target="_blank"
                                                           href="https://flows.network/">flows.network</a></div>
                <div className={"max-w-full " + (mdData ? "block" : "hidden")}>
                    <div className="mdTable markdown-body max-w-full max-h-96 overflow-auto">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                            {mdData}
                        </ReactMarkdown>
                    </div>
                    <div className="flex justify-end">
                        <Button className="py-4 px-12 mt-3" type="primary" onClick={downloadCsv}>
                            <img src="/download.svg"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
