$(document).ready(function () {
    let s = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let u = ["", "", "", "", ""];
    let err = ["", "", "", "", ""];
    let words = [];
    let wordTimes = [];
    let word = 1;
    let valCheck = 1;
    let press = 0;
    let sLine = 0;
    let good = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>';
    let bad = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>';
    let timeIn, timeOut, diff, diffSec, diffMin, wpm;
    $('#keyboard-upper-container').hide();
    $('#sentence').append(s[sLine]);
    $('#target-letter').append(s[sLine][0]);
    $("body").on("keydown", function (e) {
        if (e.which == 16) {
            $("#keyboard-upper-container").toggle();
            $("#keyboard-lower-container").toggle();
        }
    });
    $("#prompt-container").prepend("<div id=timer>");
    $('#timer').css('display', 'none');
    timeIn = Date.now();
    $('body').on('keypress', function (e) {
        let key = e.which;
        let keyText = $("#" + key).text();
        let sDiv = $("#sentence").text();
        let tDiv = $("#target-letter").text();
        if (key <= 126 || key >= 32) {
            if (key == 32) { keyText = ' Space' };
            $("#" + key).css('backgroundColor', 'yellow');
            $("body").on('keyup', function () {
                $('#' + key).removeAttr('style');
            });
            if (keyText == tDiv) {
                if (keyText == ' Space') { keyText = " ", word++; };
                $("#feedback").append(good);
                $('.bi-check-circle-fill').css('color', 'green');
                let x = press * 18;
                $("#yellow-block").css("margin-left", x);
                ++valCheck;
                ++press;
                removeReplace("#target-letter", "#feedback", "<div id=target-letter class=row>", "col-xs-12 text-center");
                $('#target-letter').append(sDiv[press]);
                if ($("#target-letter").text() == " ") {
                    $('#target-letter').append("Space");
                }
                u[sLine] = u[sLine] + keyText;
            } else {
                if (keyText == ' Space') { keyText = " " };
                err[sLine] = err[sLine] + keyText;
                $("#feedback").append(bad);
                $('.bi-x-circle').css('color', 'red');
            }
            if (s[sLine] == u[sLine]) {
                timeOut = Date.now();
                diff = timeOut - timeIn;
                diffSec = diff/1000;
                diffMin = diffSec/60;
                wordTimes.push(diffMin);
                words.push(word);
                console.log(words, wordTimes);
                let alert2 = 'Good job, here is your score:\n\nWords: ' + word + '\n\nTotal Run Time taken: ' + diffSec + ' seconds\n\nErrors made: '+ err[sLine].length;
                alert(alert2);
                removeReplace("#sentence", "#yellow-block", "<div id=sentence class=row>", "col-xs-12");
                $('span.valCheck').remove();
                $("span.wrong").remove();
                ++sLine;
                if (sLine == 5) {
                    let sumWords = 0;
                    let sumErr = 0;
                    words.forEach(item => {
                        sumWords += item;
                    });
                    wpm =sumWords/wordTimes[4];
                    let alert3 = "Game complete!\n\nYour total words per minute is "+wpm+"\n\nClick to Reset";
                    alert(alert3);
                    u = ["", "", "", "", ""]
                    err = ["", "", "", "", ""]
                    words = [];
                    wordTimes = [];
                    press = 0;
                    sLine = 0;
                    valCheck = 1;
                    word = 1;
                }
                $('#sentence').append(s[sLine]);
                $("#yellow-block").css("margin-left", 0);
                press = 0;
                valCheck = 1;
                $('svg').remove('.bi');
                $('#target-letter').append(s[sLine][0]);
                word = 1;
            };
        }
    })
})

alert('Welcome to my type game.\n\nOnce you click "Ok" the time starts and your goal is to type the sentence as accuratly as possible.\n\nYou have to get the letters right or you can not move forward!');

function removeReplace(remove, after, htmlIdClass, xClass) {
    $(remove,).remove();
    $(after).after(htmlIdClass);
    $(remove).addClass(xClass);
};