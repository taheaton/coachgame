import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';

import Questions from './questions';
console.log('Hello, World');

//questions code
(function() {
  let questions = [{
    question: 'Late in the game against Boise A&M, the Eagles score late to cut it to one.  For the extra point, what should Coach do?',
    choices: ['Line up for the kick, but fake it to try to get the 2!', 'Take the easy extra point and take your chances in OT',],
    correctAnswer: 1
  }, {
    question: 'You are winning by 2 but Wisconsin Tech has it first and goal on the 4 with 2:00 to play.',
    choices: ['Call your timeouts to preserve as much time as possible', 'let the clock run, maybe the defense will hold',],
    correctAnswer: 0
  }, {
    question: 'Trailing by 4 against Dubuque, you have the ball, first and goal on 2.  With 15 seconds left and no timeouts ...',
    choices: ['Play action pass to the tight end with your fullback as option 2', 'no need to get fancy, just run the ball!',],
    correctAnswer: 0
  }, {
    question: 'You are winning 43-42 with 2:00 to play against Nebraska State.  You have the ball but it is 4th and 1 on your own 30 ...',
    choices: ['Punt the ball and rely on the defense', 'Go for it!  If you get the first down, you win the game!,'],
    correctAnswer: 1
  }, {
    question: 'St. Paul has just scored and on the last play of the game and they need 2 pts to tie.  Their qb will wrap up the Heisman with a victory.  Luther wants to dial up a blitz ...',
    choices: ['Heck yeah we blitz!  Throw the kitchen sink at em', 'Sneak the dime package in and show blitz, but rush 3 and drop back in coverage'],
    correctAnswer: 1
  }];
  
  var questionCounter = 0;  //Tracks question number
  var selections = [];  //Array containing user choices
  var quiz = $('#quiz');  //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function(e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function(e) {
    e.preventDefault();
    
    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function(e) {
    e.preventDefault();
    
    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if (questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();