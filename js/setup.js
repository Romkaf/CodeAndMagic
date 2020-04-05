'use strict';

// function Wizard (name, coatColor, eyesColor) {
//   this.name = name;
//   this.coatColor = coatColor;
//   this.eyesColor = eyesColor;
// }

let userSetupWindow = document.querySelector('.setup');
// userSetupWindow.classList.remove('hidden');

let similarListElement = userSetupWindow.querySelector('.setup-similar-list');

let similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

let WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия',     'Люпита', 'Вашингтон'];
let WIZARD_SURNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
let COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
let EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

let FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

let wizards = [];

let generateRandomData = function () { 
  for (let i = 0; i < 4; i++) {
    let nameRand = Math.floor(Math.random() * WIZARD_NAMES.length);
    let surNameRand = Math.floor(Math.random() * WIZARD_SURNAMES.length);
    let coatColorRand = Math.floor(Math.random() * COAT_COLORS.length);
    let eyesColorRand = Math.floor(Math.random() * EYES_COLORS.length);
    // Массив обьектов с помощью добавления в конец массива объекта wizard через метод push
    // let wizard = {
    //   name: WIZARD_NAMES[nameRand] + WIZARD_SURNAMES[surNameRand],
    //   coatColor: COAT_COLORS[coatColorRand],
    //   eyesColor: EYES_COLORS[eyesColorRand]
    // };
    // wizards.push(wizard);

    // Массив объектов с помощью ф-ции констр-ра и оператора new
    // wizards[i] = new Wizard(WIZARD_NAMES[nameRand] + WIZARD_SURNAMES[surNameRand], COAT_COLORS[coatColorRand],EYES_COLORS[eyesColorRand]);
    
    // Массив через присовение объекта в цикле 
    wizards[i] = {
      name: WIZARD_NAMES[nameRand] + WIZARD_SURNAMES[surNameRand],
      coatColor: COAT_COLORS[coatColorRand],
      eyesColor: EYES_COLORS[eyesColorRand]
    };

    // Удаление выбранного эл-та из массивов, чтобы избежать повтореных значений свойств
    WIZARD_NAMES.splice(nameRand, 1);
    WIZARD_SURNAMES.splice(surNameRand, 1);
  }
}

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

let appendWizards = function () {
  let fragment = document.createDocumentFragment();
  generateRandomData();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

appendWizards();
userSetupWindow.querySelector('.setup-similar').classList.remove('hidden');

// Делаем открытие и закрытие окна настройки

const setupOpen = document.querySelector('.setup-open');
const setup = document.querySelector('.setup');
const setupClose = setup.querySelector('.setup-close');
const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const userNameInput = setup.querySelector('.setup-user-name');

let onUserNameInput = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    this.blur();
    evt.stopPropagation();
  }
}

let openPopap = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
          closePopap();
    }  
  });
};

let closePopap = function () {
  setup.classList.add('hidden');
}

userNameInput.addEventListener('keydown', onUserNameInput);

setupOpen.addEventListener('click', function() {
  openPopap();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopap();
  }
});

setupClose.addEventListener('click', function() {
  closePopap();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopap();
  }
});

//Устанавливаем кастомные предупреждения об неправильно заполненных полях формы 
userNameInput.addEventListener('invalid', function(evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
          userNameInput.setCustomValidity('Обязательное поле');
      } else {
          userNameInput.setCustomValidity('');
        }  
});

// Меняем цвет плаща, глаз и файерболла волшебника при нажатии
let wizardCoat = userSetupWindow.querySelector('.wizard-coat');
let wizardEyes = userSetupWindow.querySelector('.wizard-eyes');
let wizardFireball = userSetupWindow.querySelector('.setup-fireball-wrap');
let wizardCoatInput = userSetupWindow.querySelector('input[name = coat-color]');
let wizardEyesInput = userSetupWindow.querySelector('input[name = eyes-color]');
let wizardFireballInput = userSetupWindow.querySelector('input[name = fireball-color]');
let indexColor=0;

let changeColor = function (array) {
  if (indexColor >= array.length - 1) {
    indexColor = -1;
  }
  indexColor= indexColor+1;
  let colorItem = array[indexColor];
  return colorItem;
}

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = changeColor(COAT_COLORS);
  wizardCoatInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = changeColor(EYES_COLORS);
  wizardEyesInput.value = wizardEyes.style.fill;
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = changeColor(FIREBALL_COLORS);
  wizardFireballInput.value = wizardFireball.style.background;
});
