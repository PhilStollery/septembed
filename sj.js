const nowCurrentScript = document.currentScript
const urlParams = new URLSearchParams(nowCurrentScript.src.split('.js')[1])
const params = Object.fromEntries(urlParams.entries())

const stylesheet = `
.sj-container {
    padding:10px;
    border-radius:20px;
    display:block;
    text-decoration:none;
    transition: background 1s ease;
}

.sj-container:hover {
    background: #ffc000;
}

.sj-subtitle {
    font-size: 0.9em;
}
.sj-progress {
    font-size: 0.9em;
    box-sizing:border-box;
    padding-left:10px;
    height:100%;
    background:black;
    border-top-left-radius:15px;
    border-bottom-left-radius:15px;
    display:flex;
    align-items: center;
    color: white;
}

.sj-goal {
    position: absolute;
    right: 5px;
    top: 4px;
    color: black;
    font-size: 0.9em;
}
`

const darkMode = `
.sj-container {
    background:black;
    color:white;
    border: 2px solid white;
}
`

const lightMode = `
.sj-container {
    background: #fddb73;
    color:black;
    border: 2px solid #ffc000;
}
`

const themes = {
    dark: darkMode,
    light: lightMode
}

if (params.u)
{
    const url = new URL(params.u)
    const [vanity, slug] = url.pathname.split('/').filter(p => p)
    const path = `https://septembed.rknight.me/sj.php?vanity=${vanity}&slug=${slug}`
    fetch(path)
    .then((response) => response.json())
    .then((data) => {
        container = document.createElement('a')
        container.className = 'sj-container'
        container.href = data.url
        container.target = '_blank'

        title = document.createElement('p')
        title.className = 'sj-title'
        title.style = 'margin-top: 0;margin-bottom:5px;font-weight:bold'
        title.innerHTML = `${data.title}<br style="margin-bottom:5px;">`
        container.append(title)

        subtitle = document.createElement('p')
        subtitle.className = 'sj-subtitle'
        subtitle.style = 'margin-top: 0;'
        subtitle.innerHTML = 'Raising money for St Jude Children\'s Research Hospital this September'
        container.append(subtitle)

        progressWrap = document.createElement('div')
        progressWrap.style = 'position:relative;height:25px;background:rgb(189, 195, 199, 0.4);border-radius:15px;'
        progressWrap.innerHTML = `<div class="sj-goal">${data.goal}</div>`

        progress = document.createElement('div')
        progress.className = 'sj-progress'
        progress.innerHTML = ` ${data.raised}`
        progress.style = `width:${data.percentage}%;`
        progressWrap.append(progress)
        container.append(progressWrap)

        styles = document.createElement('style')
        styles.innerHTML = stylesheet
        styles.innerHTML += themes[data.mode]

        nowCurrentScript.parentNode.insertBefore(styles, nowCurrentScript)
        nowCurrentScript.parentNode.insertBefore(container, nowCurrentScript)
    })
}