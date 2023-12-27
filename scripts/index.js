$(document).ready(function() {
    const blockOther = $(document).find('.main__block')

    handleClick('.main__block', (item) => {
        item.style.opacity = 0;
        setTimeout(() => {
            item.style.display = 'none';
        }, 300);
    }, createInnerContent);

    function handleClick(selector, actionOnOthers, actionOnClick) {
        const elements = $(document).find(selector);
        $(elements).click((e) => {
            if(e.target === e.currentTarget) {
                $(elements).each(function(i, item) {
                    if(item !== e.target) {
                        actionOnOthers(item);
                    } else {
                        actionOnClick(item);
                    }
                })
            }
        })
    }



    function createInnerContent(target) {
        target.classList.add("main__block_active")

            target.innerHTML = `
        <div class="main__block-inner">text</div>
        <div class="main__block-inner">tables</div>
        <div class="main__block-inner">dnevnik</div>
        `
        let blockInner = $(target).find('.main__block-inner')
        $(blockInner).click((e) => {
            updateInnerContent(e.target)
        })
    }

    function updateInnerContent(target) {
        let parent = $(target).parent();
        console.log(parent)
        $(parent).html(`
            <section class="main-table">
    <div class="main-table__row">
        <p class="main-table__column">Дата</p>
        <p class="main-table__column">Ситуация</p>
        <p class="main-table__column">Мысль</p>
        <p class="main-table__column">Эмоция</p>
        <p class="main-table__column">%</p>
    </div>

    <button class="main-table__new-caption">Добавить новую запись</button>
</section>
        `)

    }

})

