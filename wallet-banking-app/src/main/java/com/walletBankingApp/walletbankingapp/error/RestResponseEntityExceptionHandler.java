package com.walletBankingApp.walletbankingapp.error;

import com.walletBankingApp.walletbankingapp.entity.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BankServiceException.class)
    public ResponseEntity<ErrorMessage> bankServiceException(BankServiceException bankServiceException){
        ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST, bankServiceException.getCause().getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
}
