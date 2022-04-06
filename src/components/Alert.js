import React from "react";

export default function Alert({title}) {
    return (
        <div className="alert alert-danger" role="alert">
            {title}
        </div>
    );
}