import React from "react";
import {useField, Field} from 'formik';

export const CustomTextInput = ({...props}) => {
    const [fields, meta] = useField(props);

    return(
        <div className={"form-group"}>
            <label htmlFor={props.id || props.name}>{props.label}</label><span className={"mess-error"}>{meta.error ? " - " + meta.error :null}</span>
            <input type={"text"} className={"form-control form-control-sm"} {...fields} {...props}/>
        </div>
    );
};

export const CustomTextArea = ({...props}) => {
    const [fields, meta] = useField(props);

    return(
        <div className={"form-group"}>
            <label htmlFor={props.id || props.name}>{props.label}<span className={"mess-error"}>{meta.error ? " - " + meta.error :null}</span></label>
            <textarea className={"form-control"} {...fields} {...props}/>
        </div>
    );
}

export const CustomInputFile = ({...props}) => {
    const [fields, meta] = useField(props);

    return(
        <>
            <span className={"mess-error"}>{meta.error ? " - " + meta.error :null}</span>
            <div className={"col-12 custom-file-holder"}>
                <label htmlFor={props.id || props.name} className={"custom-file-upload"}>{props.label}</label>
                <input type={"file"} className={"form-control"} {...props} {...fields}/>
                <p style={{float:"right", margin:"5px 40px 5px 5px"}}>{props.filenameinput ? props.filenameinput : "Please select a file..."}</p>
            </div>
        </>
    );
}

export const CustomSelectInput = ({...props}) => {
    const [fields, meta] = useField(props);

    return(
        <div>
            <label htmlFor={props.id || props.name}>{props.label}</label>
            <Field as={"select"} className={"form-control"} {...fields} {...props} />
            <p className={"mb-3"}>{meta.error? meta.error: null}</p>
        </div>
    );
}
