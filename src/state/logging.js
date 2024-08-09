const Environment = import.meta.env.ENVIRONMENT

const developerLog = (message) => {
    if (Environment === "dev" || Environment === "uat") {
        console.log(message);
    }
}

export default developerLog;