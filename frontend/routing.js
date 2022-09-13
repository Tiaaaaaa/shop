const path = require("path");

module.exports = setRoutes = (app) => {

    /**
     * pagina iniziale
     */
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend//pages/index.html"));
    });

    /**
     * pagina del carico
     */
    app.get('/carico', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/pages/carico.html"));
    });

    /**
     * pagina dello scarico
     */
    app.get('/scarico', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/pages/scarico.html"));
    });

    /**
     * Esposizione delle risorse
     */
    app.use("/res", express.static(path.join(__dirname, 'frontend')));

}
