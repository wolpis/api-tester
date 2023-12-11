import { useEffect, useState } from "react"
import "../css/home.css"
import { InputZone } from "../components/home";

const GetStatus = (code) => {
    console.log(code)
    if (code >= 200 && code < 300) {
        return[ "green", code + " OK"]
    } else if (code >= 400 && code < 600) {
        return ["red", code]
    } else {
        return ["orange", code]
    }
}

function HomePage() {
    const [URL, SetURL] = useState("");
    const [methed, SetMethed] = useState("GET");
    const [headers, SetHeaders] = useState({});
    const [body, SetBody] = useState({});

    const [result, SetResult] = useState(null);
    const [looding, Setlooding] = useState(false);
    useEffect(() => {
        Setlooding(false);
    }, [result])
    
    return (
        <div className="container">
            <header>
                <h3>API Tester</h3>
            </header>
            <div className="boxs flex flex_col">
                <InputZone
                 URL={URL} 
                 SetURL={SetURL} 
                 methed={methed} 
                 SetMethed={SetMethed} 
                 headers={headers} 
                 SetHeaders={SetHeaders} 
                 body={body} 
                 SetBody={SetBody} 
                 result={result} 
                 SetResult={SetResult}
                 Setlooding={Setlooding}
                 />
                <div className="output_zone">
                    <h2>Response</h2>
                    {
                        !looding && result != null ? <ResultBar type={GetStatus(result?.status_code)[0]} message={GetStatus(result?.status_code)[1]}/> : null
                    }
                    {
                        looding ? <h4 style={{marginTop: "10px"}}>로딩중...</h4> : <OutPutZone result={result}/>
                    }
                </div>
            </div>
        </div>
    )
}

const OutPutZone = ({result}) => {
    return (
        <>
        <div style={{marginTop: "20px"}}/>
        <h4>HEADERS</h4>
        <hr style={{marginTop:"7px"}}></hr>
        <div className="header">
            {
                result != null ? 
                JSON.parse(JSON.stringify(result?.headers))
                    : null
            }
        </div>
        <div style={{marginTop: "20px"}}/>
        <h4>Body</h4>
        <hr style={{marginTop:"7px"}}></hr>
        
        {
            result?.type == "text" ? <TextBody result={result}/> : <ImageBody result={result}/>
        }
        </>
    )
}

const ImageBody = ({result}) => {
    return (
        <div className="body">
            {
                result != null ? 
                <img style={{margin: "10px", maxWidth: "50%"}}src={"data:image/png;base64," + result.content}></img>
                    : null
            }
        </div>
    )
}

const TextBody = ({result}) => {
    return (
        <div className="body">
            {
                result != null ? 
                result?.content
                    : null
            }
        </div>
    )
}

const ResultBar = ({type, message}) => {
    return (
        <div className="status_bar" style={{backgroundColor: type}}>
            <h2>{message}</h2>
        </div>
    )
    
}
export default HomePage;