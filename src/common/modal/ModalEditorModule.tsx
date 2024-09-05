const ReactModule: React.FC = () => {
    return (
        <>
            <div className="ql-formats">
                <select className="ql-header" defaultValue="5">
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                    <option value="5">Normal</option>
                </select>
            </div>
            <div className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
                <button className="ql-blockquote" />
            </div>

            <div className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
            </div>
            <div className="ql-formats">
                <select className="ql-color" />
                <select className="ql-background" />
                <select className="ql-align" />
            </div>
            <div className="ql-formats">
                <button className="ql-code-block" />
                <button className="ql-link" />
                <button className="ql-image" />
            </div>
        </>
    );
};

export default ReactModule;
