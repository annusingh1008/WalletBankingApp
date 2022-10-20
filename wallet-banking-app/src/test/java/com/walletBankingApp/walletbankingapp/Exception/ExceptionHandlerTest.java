package com.walletBankingApp.walletbankingapp.Exception;

import com.walletBankingApp.walletbankingapp.entity.ErrorMessage;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.error.RestResponseEntityExceptionHandler;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
public class ExceptionHandlerTest {

    @InjectMocks
    private RestResponseEntityExceptionHandler restResponseEntityExceptionHandler;

    @Test
    void bankServiceExceptionTest(){
        BankServiceException exception = new BankServiceException("Error", new Exception());
        ResponseEntity<ErrorMessage> res = restResponseEntityExceptionHandler.bankServiceException(exception);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, res.getStatusCode());
    }
}
