package com.walletBankingApp.walletbankingapp.controller;

import com.mongodb.MongoSocketException;
import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.service.TransactionService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    @Test
    @DisplayName("Should fetch all transactions")
    public void getAllTransactionsTest() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).date(new Date()).build();

        Mockito.when(transactionService.getTransactionsByEmail(any(String.class), any(Integer.class), any(Integer.class))).thenReturn(List.of(transaction));
        List<TransactionEntity> res = transactionController.getTransactionsByEmail("annu@gmail.com", 1, 10);
        Assertions.assertEquals(List.of(transaction), res);
        Mockito.verify(transactionService, Mockito.times(1)).getTransactionsByEmail(any(String.class), any(), any());
    }

    @Test
    @DisplayName("Should throw error in getting transactions")
    public void getAllTransactionsTestException() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).date(new Date()).build();

        Mockito.when(transactionService.getTransactionsByEmail(any(String.class), any(Integer.class), any(Integer.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> transactionController.getTransactionsByEmail("annu@gmail.com", 10, 1));
        Assertions.assertEquals("Error in getting transactions", ex.getMessage());
        Mockito.verify(transactionService, Mockito.times(1)).getTransactionsByEmail(any(String.class), any(Integer.class), any(Integer.class));
    }

    @Test
    @DisplayName("Should give count of all transactions")
    public void getTotalTransactionsTest() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).build();

        Mockito.when(transactionService.getTotalTransactionsByEmail(any(String.class))).thenReturn(10);
        int res = transactionController.getTotalTransactionsByEmail("annu@gmail.com");
        Assertions.assertEquals(10, res);
        Mockito.verify(transactionService, Mockito.times(1)).getTotalTransactionsByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error int getting count of all transactions")
    public void getTotalTransactionsTestException() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).build();

        Mockito.when(transactionService.getTotalTransactionsByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> transactionController.getTotalTransactionsByEmail("annu@gmail.com"));
        Assertions.assertEquals("Error in getting transactions", ex.getMessage());
        Mockito.verify(transactionService, Mockito.times(1)).getTotalTransactionsByEmail(any(String.class));
    }
}
