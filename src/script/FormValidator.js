export default class FormValidator{
  constructor(config, elementForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._elementForm = elementForm;
    this._inputs = Array.from(this._elementForm.querySelectorAll(this._inputSelector));
    this._submitButton = this._elementForm.querySelector(this._submitButtonSelector);
  }


  resetInputError = (() => {
      this._inputs.forEach((inputElement) => {
        this._hideInputError(inputElement)
      })
      this._toggleButtonState()
  })


  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };


  _hideInputError = (inputElement) => {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
  } else {
      this._hideInputError(inputElement);
  }
  };

  
  _hasInvalidInput = () => {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
  })
  }

 
  _toggleButtonState = () => {
    if(this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true)
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', true)
    }
  }

 
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  
  enableValidation = () => {
    this._setEventListeners();
  };
}
    