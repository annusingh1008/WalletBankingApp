package com.walletBankingApp.walletbankingapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Cashbacks")
public class CashbackEntity {
    public String email;
    public double prev_amount;
    public double cashback_amount;
    public double current_amount;

    public Date date;
}
