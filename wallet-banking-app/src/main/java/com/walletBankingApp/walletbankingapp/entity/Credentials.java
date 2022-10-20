package com.walletBankingApp.walletbankingapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
public class Credentials {
    public String email;
    public String password;
}
