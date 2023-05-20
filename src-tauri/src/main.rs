// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, CustomMenuItem, Menu, Submenu};

fn main() {
  //setup menu
  let pages_submenu = Submenu::new("Pages", 
    Menu::new()
      .add_item(CustomMenuItem::new("front".to_string(), "Front"))
      .add_item(CustomMenuItem::new("songs".to_string(), "Songs"))
      .add_item(CustomMenuItem::new("subtitles".to_string(), "Subtitles"))
  );
  let menu = Menu::new()
    .add_item(CustomMenuItem::new("back".to_string(), "<- Back"))
    .add_item(CustomMenuItem::new("forward".to_string(), "Forward ->"))
    .add_item(CustomMenuItem::new("reload".to_string(), "Reload"))
    .add_submenu(pages_submenu);
  //setup builder
  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
      let window = event.window();
      match event.menu_item_id() {
        "back" => {
          window.eval("window.history.back()").unwrap();
        },
        "forward" => {
          window.eval("window.history.forward()").unwrap();
        },
        "reload" => {
          window.eval("window.location.reload()").unwrap();
        },
        "front" => {
          window.eval("window.location.replace('/')").unwrap();
        },
        "songs" => {
          window.eval("window.location.replace('/songs')").unwrap();
        },
        "subtitles" => {
          window.eval("window.location.replace('/subtitles')").unwrap();
        },
        _ => {}
      }
    })
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      match app.get_cli_matches() {
        Ok(matches) => {
          match matches.subcommand {
            Some(command) => {
              //`concert` and `song` arguments are required, `video` is not
              if command.name == "concerts" {
                let concert_arg = command.matches.args.get("concert").unwrap().value.as_str().unwrap();
                if command.matches.args.get("video").unwrap().occurrences == 1 {
                  let video_arg = command.matches.args.get("video").unwrap().value.as_str().unwrap();
                  window.eval(&format!("window.location.replace('/concerts/{}?video={}')", concert_arg, video_arg)).unwrap();
                } else {
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
