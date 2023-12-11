import { useEffect } from "react"
import { Request } from "../util/request"

export const InputZone = ({URL, SetURL, methed, SetMethed, headers, SetHeaders, body, SetBody, SetResult, Setlooding}) => {
    return (
        <div className="input_zone">
            <div className="send_zone flex flex_col">
                <div className="flex url_zone">
                <Selecter methed={methed} SetMethed={SetMethed}/>
                    <div></div>
                    <input type="url" className="input_box" value={URL} onChange={e => {SetURL(e.target.value)}}/>
                    <button className="send_button" onClick={()=>{
                        if (URL != "") {
                            Setlooding(true);
                            Request(methed, URL, headers, body, SetResult);
                        } else {
                            alert("url은 필수 항목입니다!")
                        }
                    }}><b>Send</b></button>
                </div>
                
                <div>
                    <div className="header_zone">
                        <h4>HEADERS</h4>
                        <hr style={{marginTop:"7px"}}></hr>
                        {
                            Object.keys(headers).map((i, c) => { return (<CreateHeaderInput c={c} header={headers} SetHeaders={SetHeaders}/>)})
                        }
                        <button onClick={() => {
                            let copy = {...headers}
                            copy[`name${Object.keys(headers).length}`] = `value${Object.keys(headers).length}`
                            SetHeaders(copy);
                        }} style={{marginTop: "10px"}}>Add Header</button>
                    </div>
                    <div className="header_zone">
                        <h4>BODY</h4>
                        <hr style={{marginTop:"7px"}}></hr>
                        {
                            methed == "POST" || methed == "PUT" || methed == "PATCH" ? Object.keys(body).map((i, c) => {
                                return (
                                    <>
                                    <CreateBodyInput c={c} body={body} SetBody={SetBody}/>
                                    </>
                                ) 
                            }) : `XHR does not allow payloads for ${methed} request.`
                        }
                        {
                            methed == "POST" || methed == "PUT" || methed == "PATCH" ? <button onClick={() => {
                                let copy = {...body}
                                copy[`name${Object.keys(body).length}`] = `value${Object.keys(body).length}`
                                SetBody(copy);
                            }} style={{marginTop: "10px"}}>Add Body</button> : null
                        }
                    </div>
                </div>               
            </div>
        </div>
    )
}

const CreateHeaderInput = ({c, header, SetHeaders}) => {
    return (
        <div className="flex" style={{marginTop: "10px"}}>
            <input placeholder="name" value={Object.keys(header)[c]} style={{width: "10%", marginRight: "10px", padding:"5px"}}
            onChange={e => {
                let copy = {...header}
                delete copy[Object.keys(header)[c]]
                copy[e.target.value] = Object.values(header)[c]
                SetHeaders(copy)
            }}/> : <input placeholder="value" value={Object.values(header)[c]} style={{marginLeft:"10px", width: "90%", padding:"5px"}}
            onChange={e => {
                let copy = {...header}
                copy[Object.keys(header)[c]] = e.target.value
                SetHeaders(copy)
            }}/>
        </div>
    )
}

const CreateBodyInput = ({c, body, SetBody}) => {
    return (
        <div className="flex" style={{marginTop: "10px"}}>
            <input placeholder="name" value={Object.keys(body)[c]} style={{width: "10%", marginRight: "10px", padding:"5px"}}
            onChange={e => {
                let copy = {...body}
                delete copy[Object.keys(body)[c]]
                copy[e.target.value] = Object.values(body)[c]
                SetBody(copy)
            }}/> : <input placeholder="value" value={Object.values(body)[c]} style={{marginLeft:"10px", width: "90%", padding:"5px"}}
            onChange={e => {
                let copy = {...body}
                copy[Object.keys(body)[c]] = e.target.value
                SetBody(copy)
            }}/>
        </div>
    )
}

const Selecter = ( {methed, SetMethed} ) => {
    return (
        <select onChange={e => {SetMethed(e.target.value)}} value={methed} className="selecter">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTION">OPTION</option>
            <option value="PATCH">PATCH</option>
        </select>
    )
}