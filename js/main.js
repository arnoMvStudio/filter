// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {

    let filterCategory1Array = [];
    let filterCategory2Array = [];
    let filterCategory3Array = [];
    const filterTriggers = document.querySelectorAll('.js-filter');
    const filterTargets = document.querySelectorAll('.work__item');

    for (const filterTrigger of filterTriggers) {
        filterTrigger.addEventListener('click', (e) => {
            e.preventDefault();

            const filterTriggerCategory = filterTrigger.dataset.category;
            const filterTriggerFilter = filterTrigger.dataset.filter;

            // Checkbox
            if (filterTrigger.classList.contains('filter--active')) {
                filterTrigger.classList.remove('filter--active');
            } else {
                filterTrigger.classList.add('filter--active');
            }

            // Filter array
            if (filterTriggerCategory == '1') {
                filterCategory1Array = filterArrayFunc(filterCategory1Array, filterTriggerFilter);
            } else if (filterTriggerCategory == '2') {
                filterCategory2Array = filterArrayFunc(filterCategory2Array, filterTriggerFilter);
            } else if (filterTriggerCategory == '3') {
                filterCategory3Array = filterArrayFunc(filterCategory3Array, filterTriggerFilter);
            }

            // Filter targets
            filterTargetsFunc(filterCategory1Array, filterCategory2Array, filterCategory3Array);

        });
    }

    /**
     * Targets
     */

    const filterTargetsFunc = (filterCategory1Array, filterCategory2Array, filterCategory3Array) => {

        for (const filterTarget of filterTargets) {

            // Values
            let filterTargetValue1 = filterTarget.dataset.category1;
                filterTargetValue1 = filterTargetValue1.split(',');
            let filterTargetValue2 = filterTarget.dataset.category2;
                filterTargetValue2 = filterTargetValue2.split(',');
            let filterTargetValue3 = filterTarget.dataset.category3;
                filterTargetValue3 = filterTargetValue3.split(',');

            // Show / Hide
            if (!filterCategory1Array.length && !filterCategory2Array.length && !filterCategory3Array.length) {
                filterTarget.classList.remove('work__item--hidden');
            } else {
                filterTarget.classList.add('work__item--hidden');

                // One filter is true
                if (
                    filterTargetValue1.some(a => { if (filterCategory1Array != '') { return filterCategory1Array.indexOf(a) !== -1; } else { return true } }) &&
                    filterTargetValue2.some(a => { if (filterCategory2Array != '') { return filterCategory2Array.indexOf(a) !== -1; } else { return true } }) &&
                    filterTargetValue3.some(a => { if (filterCategory3Array != '') { return filterCategory3Array.indexOf(a) !== -1; } else { return true } }) ) {
                    filterTarget.classList.remove('work__item--hidden');
                }

                // All filters are true
                // if (
                //     filterCategory1Array.every(a => filterTargetValue1.includes(a) == true) &&
                //     filterCategory2Array.every(b => filterTargetValue2.includes(b) == true) &&
                //     filterCategory3Array.every(c => filterTargetValue3.includes(c) == true)) {
                //     filterTarget.classList.remove('work__item--hidden');
                // }
            }

        }
    }

    /**
     * Filter array
     */

    const filterArrayFunc = (filterArray, filterTriggerFilter) => {

        if(filterArray.indexOf(filterTriggerFilter) === -1) {
            filterArray.push(filterTriggerFilter);
        } else {
            const index = filterArray.indexOf(filterTriggerFilter);
            if (index > -1) {
                filterArray.splice(index, 1);
            }
        }
        return(filterArray);

    }

});
