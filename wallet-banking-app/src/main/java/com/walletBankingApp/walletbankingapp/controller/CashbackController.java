package com.walletBankingApp.walletbankingapp.controller;

import com.walletBankingApp.walletbankingapp.entity.CashbackEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.service.CashbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CashbackController {

    @Autowired
    private CashbackService cashbackService;

    @GetMapping(value = "/getAllCashbacks/{email}")
    public List<CashbackEntity> getAllCashBacks(@PathVariable String email,
                                                @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
                                                @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize) throws BankServiceException {
        try {
            return cashbackService.getAllcashbacks(email, pageNumber, pageSize);
        }catch (Exception e){
            throw new BankServiceException("Error in getting cashbacks", e);
        }
    }

    @GetMapping(value = "/getTotalCashbacks/{email}")
    public int getTotalCashbacksByEmail(@PathVariable String email) throws BankServiceException {
        try {
            return cashbackService.getTotalCashbacksByEmail(email);
        }catch (Exception e){
            throw new BankServiceException("Error in getting transactions", e);
        }
    }
}
