package com.walletBankingApp.walletbankingapp.controller;

import com.mongodb.MongoSocketException;
import com.walletBankingApp.walletbankingapp.entity.CashbackEntity;
import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.service.CashbackService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class CashbackControllerTest {

    @Mock
    private CashbackService cashbackService;

    @InjectMocks
    private CashbackController cashbackController;

    @Test
    @DisplayName("Should fetch all the cashbacks")
    public void getAllCashbacksTest() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(cashbackService.getAllcashbacks(any(String.class), any(Integer.class), any(Integer.class))).thenReturn(List.of(cashback));
        List<CashbackEntity> result = cashbackController.getAllCashBacks("annu@gmail.com", 0, 10);
        Assertions.assertEquals(List.of(cashback), result);
        Mockito.verify(cashbackService, Mockito.times(1)).getAllcashbacks(any(String.class), any(Integer.class), any(Integer.class));
    }

    @Test
    @DisplayName("Should throw error in getting cashbacks")
    public void getAllCashbackTestException() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(cashbackService.getAllcashbacks(any(String.class), any(Integer.class), any(Integer.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> cashbackController.getAllCashBacks("annu@gmail.com", 0, 10));
        Assertions.assertEquals("Error in getting cashbacks", ex.getMessage());
        Mockito.verify(cashbackService, Mockito.times(1)).getAllcashbacks(any(String.class), any(Integer.class), any(Integer.class));
    }

    @Test
    @DisplayName("Should give count of all transactions")
    public void getTotalCashbacksTest() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(cashbackService.getTotalCashbacksByEmail(any(String.class))).thenReturn(10);
        int res = cashbackController.getTotalCashbacksByEmail("annu@gmail.com");
        Assertions.assertEquals(10, res);
        Mockito.verify(cashbackService, Mockito.times(1)).getTotalCashbacksByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error int getting count of all transactions")
    public void getTotalTransactionsTestException() throws BankServiceException {
        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(cashbackService.getTotalCashbacksByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> cashbackController.getTotalCashbacksByEmail("annu@gmail.com"));
        Assertions.assertEquals("Error in getting transactions", ex.getMessage());
        Mockito.verify(cashbackService, Mockito.times(1)).getTotalCashbacksByEmail(any(String.class));
    }
}
