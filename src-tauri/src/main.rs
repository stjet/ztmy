// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      match app.get_cli_matches() {
        Ok(matches) => {
          match matches.subcommand {
            Some(command) => {
              //`concert` and `song` arguments are required, `video` is not
              if command.name == "concerts" {
                let concert_arg = command.matches.args.get("concert").unwrap().value.as_str().unwrap();
                println!("{:?}", command.matches.args.get("video"));
                if command.matches.args.get("video").unwrap().occurrences == 1 {
                  println!("a");
                  let video_arg = command.matches.args.get("video").unwrap().value.as_str().unwrap();
                  window.eval(&format!("window.location.replace('/concerts/{}?video={}')", concert_arg, video_arg)).unwrap();
                } else {
                  println!("b");
                  window.eval(&format!("window.location.replace('/concerts/{}')", concert_arg)).unwrap();
                }
              } else if command.name == "songs" {
                let song_arg = command.matches.args.get("song").unwrap().value.as_str().unwrap();
                window.eval(&format!("window.location.replace('/songs/{}')", song_arg)).unwrap();
              }
            },
            None => {}
          }
        },
        Err(_e) => {}
      }
      //
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
