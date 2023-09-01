





const catagoryHandle = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const categories = data.data
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
       <a  onclick="categoryEventHandle('${category.category_id}')" class="tab btn btn-active text-black hover:bg-red-200">${category.category}</a> 
       `

        categoryContainer.appendChild(div)
    });

}


const secondsToHour = (sec) => {

    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);


    return {
        hour: hours,
        minute: minutes,
    }
}
const categoryEventHandle = async (id) => {

    const response = await fetch(`
  https://openapi.programming-hero.com/api/videos/category/${id}
  `);
    const data = await response.json();
    const videos = data.data;
    
    const noData = document.getElementById('no-data')
    if (videos.length < 1) {
        noData.classList.remove('hidden');
    } else {
        noData.classList.add('hidden')
    }
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""
    videos?.forEach(video => {

        // console.log(video);
        const div = document.createElement('div');
        const secounds = video.others?.posted_date;
        const time = secondsToHour(secounds);
        div.innerHTML = `
    <div class="card   shadow-xl">
    <div class="relative">
        <img class="h-[200px] w-[312px] bg-base-100 mx-auto rounded-lg" src="${video.thumbnail}" alt="thumbnail" />
        <div id="times-container" class="" >
        
        <p id="" class=" absolute right-1/3 bg-[#363636] text-white text-xs p-1 rounded-lg 
        bottom-0">${time?.hour} hrs ${time?.minute} min ago</p>
        </div>
    </div>
    <div class="card-body flex flex-row justify-center items-center gap-3">
        <div class="flex gap-5">
            <img class="mr-4 h-10 w-10 rounded-full" src="${video.authors[0]?.profile_picture}" alt="">
            
        </div>

        <div class="flex-1">
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex gap-5">
                <p class="font-normal text-sm text-[#302f2fb2]">${video.authors[0]?.profile_name}</p>
                <div  class=" badge-cont">
                    ${video.authors[0]?.verified === true && '<img src="verified.png">' || ""}
                </div>
            </div>
            <p class="font-normal text-sm text-[#302f2fb2]">${video?.others?.views + ' ' + 'views'}</p>
        </div>

    </div>
</div>
    `
        // ${obj.verified === true && '<div> </div>' }

        cardContainer.appendChild(div);


    });


}

categoryEventHandle("1000")
catagoryHandle();