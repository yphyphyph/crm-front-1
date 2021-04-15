let base = {
    getBase64Str(file) {
        return new Promise(resolve => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = function (e) {
                resolve(e.target.result);
            }
        })
    }


}

export default base;
