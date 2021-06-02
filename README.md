# Books-api

API para exponer libros de una tabla mysql.

## GET /books

Devuelve todos los libros disponibles.

#### Respuesta:

```
[{"ID":17,"Title":"El principito","Author":"Antoine de Saint-Exupery","Year":"31/08/2001","Image":"https://images-na.ssl-images-amazon.com/images/I/41iS616ndCL._SX312_BO1,204,203,200_.jpg","Sinopsis":"Fábula mítica y relato filosófico que interroga acerca de la relación del ser humano con su prójimo y con el mundo...","Position":5}]
```

## POST /new

Crea un nuevo libro.

#### Petición:

Para ello se requiere enviar un json en el body con el siguiente formato:

```
{
    Title: String,
    Author: String,
    Year: String,
    Image: String,
    Sinopsis: String,
}
```

#### Respuesta:

Si no ha habido ningún error la API devuelve:

```
{ok: true, message: "Libro creado: Nuevo libro"}

```

## POST /delete

Borra un libro a través de su ID.

#### Petición:

Se requiere enviar el ID del libro que se desea borrar.

Este ID debe ser el que se obtiene en la respuesta de GET /books.

#### Respuesta:

Si no ha habido ningún error la API devuelve:

```
{ ok: true, message: "Libro borrado correctamente" }
```

## POST /update

Modificar la información de un libro.

#### Petición:

Es necesario enviar los mismos campos que se requieren al crear un libro en formato json:

```
{
    Title: String,
    Author: String,
    Year: String,
    Image: String,
    Sinopsis: String,
}

```

#### Respuesta:

Si no habido ningún error la API devuelve:

```
{ ok: true, message: "Libro actualizado correctamente" }

```

## POST /sort

Reordenar libros y guardar el nuevo orden.

#### Petición:

Para guardar el orden de los libros es necesario enviar los ID de estos ordenados en un array.

Ejemplo:

1º Libro -->ID 3

2º Libro -->ID 1

3º Libro -->ID 4

4º Libro -->ID 5

Para conseguir este orden se debe enviar:

```
{
    Order: [3, 1, 4, 5]
}
```

#### Respuesta:

Si no habido ningún error la API devuelve:

```
{ ok: true, message: "Libros ordenados" }

```
