const toast = document.querySelector('.toast--container');
const toastHideBtn = document.querySelector('.close--btn');

    setTimeout(function(){
        toast.style.display = "none";
        }, 3000);

        function hideToast(){
            toast.style.display = "none";
        }

 toastHideBtn.addEventListener('click', hideToast);