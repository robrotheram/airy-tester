

export const TestProgress = ({success, skipped, failuire}) => {
    const total = success + skipped + failuire;
    const progressStyle = {
        borderRadius: "30px",
        display: "flex",
        flex: "10% 10% auto",
        background: "#e5e5ea"
    }

    const baseStyle = {
        height: "100%",
        margin: "0px",
        textAlign: "center",
        display: "flex",
        color: "black",
        fontSize: "14px",
        padding: "5px",
        justifyContent: "center"
    }

    const successStyle = {
        ...baseStyle, 
        backgroundColor: "#4caf50",
        flexBasis: `${(success/(total))*100}%`,
        borderRadius: "50px 0 0 50px"
    }

    const skipStyle = {
        ...baseStyle, 
        backgroundColor: "#ffc107",
        flexBasis: `${(skipped/(total))*100}%`,
    }

    const failureStyle = {
        ...baseStyle, 
        backgroundColor: "#f44336",
        flexBasis: `${(failuire/(total))*100}%`,
        borderRadius: "0 50px 50px 0"
    }


    if (success === 100){
        successStyle.borderRadius = "50px"
    } else if (skipped === 100){
        skipStyle.borderRadius = "50px"
    } else if (failuire === 100){
        failureStyle.borderRadius = "50px"
    } else if (success === 0 && skipped > 0){
        skipStyle.borderRadius = "50px 0 0 50px"
    } else if (failuire === 0 && skipped > 0){
        skipStyle.borderRadius = "0 50px 50px 0"
    }


    return (
        <div style={progressStyle}>
            {success > 0 ?<div style={successStyle}>{success}</div>:null}
            {skipped > 0 ?<div style={skipStyle}>{skipped}</div>:null}
            {failuire > 0 ? <div style={failureStyle}>{failuire}</div>:null}
        </div>
    )
}
