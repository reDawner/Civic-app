import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const analyzeImage = async (imagePath) => {

    const form = new FormData();

    form.append("file", fs.createReadStream(imagePath));

    const response = await axios.post(
        "http://localhost:8000/analyze",
        form,
        { headers: form.getHeaders() }
    );

    return response.data;
};