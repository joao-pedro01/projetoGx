import express from "express";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Teste"});
    });
    app.route('/test').get((req,res) => {
        res.status(200).send({test: 1});
    })
};

export default routes;