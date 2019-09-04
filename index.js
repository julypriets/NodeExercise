const fs = require('fs'),
    express = require('express'),
    app = express(),
    axios = require('axios');

const jsonRoute = 'https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json';

axios.get(jsonRoute)
    .then(function (response) {
        // stringify JSON Object
        var jsonContent = JSON.stringify(response.data);
        fs.writeFile("products.json", jsonContent, 'utf8', err => {
            console.log("Archivo creado correctamente");
        })
        let jsonObject = JSON.parse(jsonContent);
        writeCard(jsonObject)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    }).finally(function () {
        console.log("Finished!")
    });


function writeCard(jsob) {
    const html =
        '<!DOCTYPE html>' +
        '<html lang="en">' +

        '<head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
        '<title>Document</title>' +

        ' <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">' +
        '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>' +
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>' +
        '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>' +
        '</head>' +

        '<body>'+
    '<div class="accordion" id="accordionExample">';
    const js = jsob;

    fs.writeFileSync("index.html", html, err => {
        console.log("part I done :D")
    })
    writeCards((resultado) => {
        fs.appendFileSync("index.html", resultado, err => {
            console.log("part II done")

        })
    }, js)
    fs.appendFileSync("index.html", '</div>' + '</body>' +
        '</html>', err => {
            console.log("Part III done")
        })
}

function writeCards(callback, jsonObject) {
    Object.keys(jsonObject).forEach(key => {

        console.log(jsonObject[key].name);
        const ob = jsonObject[key]

        const html = '<div class="card">' +
            '<div class="card-header" id="headingOne">' +
            '<h2 class="mb-0">' +
            '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + ob.name.substring(0,3) + '"  aria-expanded="true" aria-controls="collapse' + ob.name.substring(0,3) + '">' +
            ob.name +
            '</button>' +
            '</h2>' +
            '</div>' +

            '<div id="collapse' + ob.name.substring(0,3) +'" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">' +
            '<div class="card-body">';

        const innerHtml = createInnerCards(ob);

        const endHtml =
            '</div>' +
            '</div>'+
            '</div>';

        const sup = html.concat(innerHtml);
        const supSup = sup.concat(endHtml);
        callback(supSup)
    });
}

function createInnerCards(obj) {
    var superHtml = ""
    for (let i = 0; i < obj.products.length; i++) {
        let innerHtml = '<div class="card" style="width: 18rem;">' +
            '<img src="' + obj.products[i].image + '" class="card-img-top" alt="...">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + obj.products[i].name + ' [' + obj.products[i].price + ' ]' + '</h5>' +
            '<p class="card-text">' + obj.products[i].description + '</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' +
            '</div>';
        superHtml = superHtml + innerHtml;
    }
    return superHtml;
}