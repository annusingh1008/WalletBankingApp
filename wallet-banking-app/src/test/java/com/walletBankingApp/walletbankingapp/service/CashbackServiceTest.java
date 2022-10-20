package com.walletBankingApp.walletbankingapp.service;

import com.mongodb.MongoSocketException;
import com.walletBankingApp.walletbankingapp.entity.CashbackEntity;
import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.repository.CashbackRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class CashbackServiceTest {

    @Mock
    private CashbackRepository cashbackRepository;

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private CashbackService cashbackService;

    @Test
    @DisplayName("Should fetch all the cashbacks")
    public void getAllCashbacksTest() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(mongoTemplate.find(any(Query.class), any(Class.class))).thenReturn(List.of(cashback));
        List<CashbackEntity> res = cashbackService.getAllcashbacks("annu@gmail.com", 0, 1);
        Assertions.assertEquals(List.of(cashback), res);
        Mockito.verify(mongoTemplate, Mockito.times(1)).find(any(Query.class), any(Class.class));
    }

    @Test
    @DisplayName("Should throw error in getting cashbacks")
    public void getAllCashbacksTestException() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(mongoTemplate.find(any(Query.class), any(Class.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> cashbackService.getAllcashbacks("annu@gmail.com", 0, 1));
        Assertions.assertEquals("Error in getting cashbacks", ex.getMessage());
        Mockito.verify(mongoTemplate, Mockito.times(1)).find(any(Query.class), any(Class.class));
    }

    @Test
    @DisplayName("Should give count of all cashbacks")
    public void getTotalTransactionsTest() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(cashbackRepository.getAllcashbacksByEmail(any(String.class))).thenReturn(List.of(cashback));
        int res = cashbackService.getTotalCashbacksByEmail("annu@gmail.com");
        Assertions.assertEquals(List.of(cashback).size(), res);
        Mockito.verify(cashbackRepository, Mockito.times(1)).getAllcashbacksByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error int getting count of all cashbacks")
    public void getTotalTransactionsTestException() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(cashbackRepository.getAllcashbacksByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> cashbackService.getTotalCashbacksByEmail("annu@gmail.com"));
        Assertions.assertEquals("Error in getting cashbacks", ex.getMessage());
        Mockito.verify(cashbackRepository, Mockito.times(1)).getAllcashbacksByEmail(any(String.class));
    }
}
