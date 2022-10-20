package com.walletBankingApp.walletbankingapp.service;

import com.mongodb.MongoSocketException;
import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.repository.TransactionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private TransactionService transactionService;

    @Test
    @DisplayName("Should fetch all transactions")
    public void getAllTransactionsTest() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).date(new Date()).build();

        Mockito.when(mongoTemplate.find(any(Query.class), any(Class.class))).thenReturn(List.of(transaction));
        List<TransactionEntity> res = transactionService.getTransactionsByEmail("annu@gmail.com", 0, 1);
        Assertions.assertEquals(List.of(transaction), res);
        Mockito.verify(mongoTemplate, Mockito.times(1)).find(any(Query.class), any(Class.class));
    }

    @Test
    @DisplayName("Should throw error in getting all transactions")
    public void getAllTransactionsTestException() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).date(new Date()).build();

        Mockito.when(mongoTemplate.find(any(Query.class), any(Class.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> transactionService.getTransactionsByEmail("annu@gmail.com", 0, 1));
        Assertions.assertEquals("Error in getting transactions", ex.getMessage());
        Mockito.verify(mongoTemplate, Mockito.times(1)).find(any(Query.class), any(Class.class));
    }

    @Test
    @DisplayName("Should give count of all transactions")
    public void getTotalTransactionsTest() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).build();

        Mockito.when(transactionRepository.getTotalTransactionsByEmail(any(String.class))).thenReturn(List.of(transaction));
        int res = transactionService.getTotalTransactionsByEmail("annu@gmail.com");
        Assertions.assertEquals(List.of(transaction).size(), res);
        Mockito.verify(transactionRepository, Mockito.times(1)).getTotalTransactionsByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error int getting count of all transactions")
    public void getTotalTransactionsTestException() throws BankServiceException {
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("Annu Singh").to_name("Pranali Joshi")
                .type("Debit").transferAmount(1000).amount(2000).build();

        Mockito.when(transactionRepository.getTotalTransactionsByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> transactionService.getTotalTransactionsByEmail("annu@gmail.com"));
        Assertions.assertEquals("Error in getting transactions", ex.getMessage());
        Mockito.verify(transactionRepository, Mockito.times(1)).getTotalTransactionsByEmail(any(String.class));
    }
}
