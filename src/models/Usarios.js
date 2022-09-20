import connection from "mysql2";

const usuarios =  connection.query(sqlQry, (error, results, fields) => 
    {
        if(error) 
        res.json(error);
        else
        res.json(results);
        connection.end();
        console.log('executou!');
    }
);

const livros = results
export default livros;