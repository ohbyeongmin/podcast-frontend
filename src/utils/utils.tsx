export const uploadAwsS3 = async (file: File): Promise<string> => {
    const actualFile = file;
    const formBody = new FormData();
    formBody.append("file", actualFile);
    const { url } = await (
        await fetch(
            process.env.NODE_ENV === "production"
                ? "https://podcast-backend-obm.herokuapp.com/uploads"
                : "http://localhost:4000/uploads",
            {
                method: "POST",
                body: formBody,
            }
        )
    ).json();
    return url;
};
