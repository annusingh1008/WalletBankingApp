package com.walletBankingApp.walletbankingapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Wallet {
    private double amount;
    private String email;
    private String creditToEmail;
}
