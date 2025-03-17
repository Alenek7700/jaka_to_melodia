const songs = [
	{
		title: 'ale_ale',
		full_title: 'Muniek Staszczyk - Ale ale',
		short_audio: 'audio/ale_ale.mp3',
		longer_audio: '',
	},
	{
		title: 'bandycka_jazda',
		full_title: 'Bandycka jazda',
		short_audio: 'audio/bandycka_jazda.mp3',
		longer_audio: '',
	},
	{
		title: 'bombiste_a',
		full_title: 'Bombiste a',
		short_audio: 'audio/bombiste_a.mp3',
		longer_audio: '',
	},
	{
		title: 'eluwina',
		full_title: 'Eluwina',
		short_audio: 'audio/eluwina.mp3',
		longer_audio: '',
	},
	{
		title: 'grill_u_gawrona',
		full_title: 'Grill u Gawrona',
		short_audio: 'audio/grill_u_gawrona.mp3',
		longer_audio: '',
	},
	{
		title: 'mazurek_dabrowskiego',
		full_title: 'Mazurek Dąbrowskiego',
		short_audio: 'audio/mazurek_dabrowskiego.mp3',
		longer_audio: '',
	},
	{
		title: 'poker_face',
		full_title: 'Lady Gaga - Poker Face',
		short_audio: 'audio/poker_face.mp3',
		longer_audio: '',
	},
	{
		title: 'przejmujemy_jutub',
		full_title: 'Przejmujemy Jutub',
		short_audio: 'audio/przejmujemy_jutuby.mp3',
		longer_audio: '',
	},
	{
		title: 'przez_twe_oczy_zielone',
		full_title: 'Przez twe oczy zielone',
		short_audio: 'audio/przez_twe_oczy_zielone.mp3',
		longer_audio: '',
	},
	{
		title: 'sexoholik',
		full_title: 'Sexoholik',
		short_audio: 'audio/sexoholik.mp3',
		longer_audio: '',
	},
	{
		title: 'siedem',
		full_title: 'Siedem',
		short_audio: 'audio/siedem.mp3',
		longer_audio: '',
	},
	{
		title: 'temperatura',
		full_title: 'Temperatura',
		short_audio: 'audio/temperatura.mp3',
		longer_audio: '',
	},
	{
		title: 'ucieklismy_z_wyspy',
		full_title: 'Ucieklismy z wyspy',
		short_audio: 'audio/ucieklismy_z_wyspy.mp3',
		longer_audio: '',
	},
	{
		title: 'zielone',
		full_title: 'Zielone',
		short_audio: 'audio/zielone.mp3',
		longer_audio: '',
	},
]

let cash = 0
let currentSong = null
let playAttempts = 0
let selectedSongs = []
let wrongAttempts = 0
let history = []

function getRandomSongs() {
	const shuffled = songs.sort(() => 0.5 - Math.random())
	return shuffled.slice(0, 5)
}

function playSong() {
	if (playAttempts < 3) {
		if (!currentSong) {
			selectedSongs = getRandomSongs()
			currentSong = selectedSongs[0]
			console.log('Selected song:', currentSong.full_title)
		}
		const audioPlayer = document.getElementById('audioPlayer')
		audioPlayer.src = currentSong.short_audio
		console.log('audio source set to:', audioPlayer.src)
		audioPlayer
			.play()
			.then(() => console.log('audio started playing'))
			.catch(error => {
				console.error('error playing audio:', error)
				document.getElementById('result').textContent = 'check audio file'
			})

		playAttempts++
		document.getElementById('playButton').textContent = `Odtwórz fragment (${3 - playAttempts}/3)`
		if (playAttempts === 3) {
			document.getElementById('playButton').disabled = true
		}

		setTimeout(() => {
			audioPlayer.pause()
			audioPlayer.currentTime = 0
		}, 5000)
	} else {
		document.getElementById('result').textContent = 'Osiągnąłeś limit odtworzeń (3 razy)!'
	}
}

function checkAnswer() {
	const input = document.getElementById('songInput').value.toLowerCase().trim()
	const result = document.getElementById('result')

	if (!currentSong) {
		result.textContent = 'Najpierw odtwórz fragment!'
		return
	}

	let previousCash = cash

	if (input === currentSong.title || input === currentSong.full_title.toLowerCase()) {
		cash += 500
		document.getElementById('cash').textContent = `${cash} zł`
		result.textContent = `Gratulacje! Wygrałeś 500 zł! Piosenka: ${currentSong.full_title}`
		history.push(`+500 zł → ${previousCash} zł → ${cash} zł`)
		updateHistory()
		resetGame()
	} else {
		wrongAttempts++

		if (wrongAttempts >= 2) {
			cash -= 100
			document.getElementById('cash').textContent = `${cash} zł`
			result.textContent = `Źle! Straciłeś 100 zł! Poprawna odpowiedź to: ${currentSong.full_title}`
			history.push(`-100 zł → ${previousCash} zł → ${cash} zł`)
			updateHistory()
			resetGame()
		} else {
			result.textContent = 'Niestety, to niepoprawna odpowiedź. Spróbuj ponownie!'
		}
	}
}

function resetGame() {
	currentSong = null
	playAttempts = 0
	wrongAttempts = 0
	document.getElementById('playButton').textContent = `Odtwórz fragment (3/3)`
	document.getElementById('playButton').disabled = false
	document.getElementById('songInput').value = ''
}

function updateHistory() {
	const historyDiv = document.getElementById('history')
	historyDiv.innerHTML = '<h3>Historia transakcji</h3>'
	history.forEach(entry => {
		const p = document.createElement('p')
		p.textContent = entry
		historyDiv.appendChild(p)
	})
}

function exitGame() {
	let summary = `Podsumowanie gry:\n\nSaldo końcowe: ${cash} zł\n\nHistoria transakcji:\n`
	summary += history.length > 0 ? history.join('\n') : 'Brak transakcji.'
	alert(summary)
}

document.getElementById('playButton').addEventListener('click', playSong)
document.getElementById('submitButton').addEventListener('click', checkAnswer)
document.getElementById('exitButton').addEventListener('click', exitGame)

document.getElementById('cash').textContent = `${cash} zł`
updateHistory()
