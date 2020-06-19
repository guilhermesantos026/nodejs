let tabelaLivros = document.querySelector('#books');

tabelaLivros.addEventListener('click', (evento) => {
    let elementoClicado = evento.target;

    if (elementoClicado.dataset.type == 'delete') {
        let bookId = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/book/${bookId}`, { method: 'DELETE' })
            .then(resposta => {

                let tr = elementoClicado.closest(`#book_${bookId}`);
                tr.remove();

            })
            .catch(erro => console.log(erro));

    }
});