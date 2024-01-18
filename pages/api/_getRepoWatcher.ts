// @ts-ignore
export default async function (req, res) {
    // @ts-ignore
    const {url,token} = req.body;
    const response = await fetch(`https://code.flows.network/webhook/vIognrnNfVdQSlIRIyIM?owner_repo=${url}&token=${token}`)
    const data = await response.text()
    res.end(JSON.stringify(data));
}
