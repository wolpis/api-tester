export const Request = (method, url, headers, body, SetResult) => {
    let _headers = headers == {} ? null : headers
    let _body = body == {} ? null : body
    console.log(method, url, headers, body)
    fetch("https://api-test.voidasmad.repl.co/request", {
        method: "GET",
        headers: {
            "method": method,
            "url": url,
            "header": JSON.stringify(_headers),
            "body": JSON.stringify(_body)

        }
    })
    .then((response) => {
        response.json().then((r) => {SetResult(r.data)});
    })
    .catch((error) => {
        return error
    })
}