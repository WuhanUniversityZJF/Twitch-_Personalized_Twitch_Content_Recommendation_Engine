package com.laioffer.twich.external;


import com.laioffer.twich.external.TwitchService;
import com.laioffer.twich.external.model.Game;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;


@RestController
public class GameController {


    private final TwitchService twitchService;


    public GameController(TwitchService twitchService) {
        this.twitchService = twitchService;
    }


    @GetMapping("/game")                    //区别于TwitchApiClient中的games名称
    public List<Game> getGames(@RequestParam(value = "game_name", required = false) String gameName) {
        if (gameName == null) {
            return twitchService.getTopGames();      //浏览器缺省输入/game相当于TwitchApiClient中的/games/top
        } else {
            return twitchService.getGames(gameName);
        }
    }
}
